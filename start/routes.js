'use strict'

const { route } = require('@adonisjs/framework/src/Route/Manager')

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const Helpers = use('Helpers')
const Database = use('Database')
const Drive = use('Drive')
// Route.on('/').render('welcome')

const Logger = use('Logger')
const { validate } = use('Validator')

Route.route('/home', () => 'Hello Adonis', ['GET', 'POST', 'PUT'])

Route.get('make/:drink?', ({ params }) => {
    // use Coffee as fallback when drink is not defined
    const drink = params.drink || 'Coffee'
  
    return `One ${drink}, coming right up!`
  })

  const Users=use('App/Models/User');
  const Navs=use('App/Models/Nav');
  const Blocks=use('App/Models/Block');
  const Lists=use('App/Models/List');
  const Middles=use('App/Models/Middle');
  // const Users=use('App/Models/Csdn');

  Route.route('/', async () => {
    // const user=await Users.find(1)
    // user.merge({ 'username':'title', 'email':'content','password':'2324'})
    // await user.save()
    const user = await Users.find(1)
    const userProfile = await user.tokens().fetch()
    return userProfile;
    // return await Database.connection('mysql').table('csdn').select('*').where('id', '>=', 40).andWhere('name','九章算法')
    // return await Factory
    // .model('App/Models/User')
    // .createMany(5)
  }, ['GET', 'POST', 'PUT'])

Route.post('nav/add',async ({request,response})=>{
  const {nav_title,type,img_link}=request.all();
  // try {
  //   const rules = {
  //     // email: 'required|email',
  //     nav_title: 'required|email',
  //     // password: 'required'
  //   }
  //   const validation = await validate(request.all(), rules)
  //   console.log(1111,validation.fails())
  //   if (validation.fails()) {
  //     // session
  //     //   .withErrors(validation.messages())
  //     //   .flashExcept(['password'])
  
  //     // return response.redirect('back')
  //     return {
  //       code:500,
  //       data:null
  //     }
  //   }
  // } catch (error) {
  //   console.log(error)
  // }
  const nav = new Navs();
  nav.nav_title=nav_title;
  // if(type===0){
  //   nav.icon_img='';
  // } else {
    nav.icon_img=img_link;
  // }
  await nav.save();

  return {
    data:null,
    code:0
  };
})

// 图片icon上传
Route.post('img/upload', async ({ request }) => {
  const profilePic = request.file('icon_img', {
    types: ['image'],
    size: '1mb',
    extnames: ['png', 'jpg']
  })
  const name_file=`${new Date().getTime()}.${profilePic.subtype}`;
  await profilePic.move('/Users/zhangjinquan/Workspace/', {
            name: name_file,
            overwrite: true
        })

  if (!profilePic.moved()) {
    return profilePic.error()
  }

  return {
    data:{
      img_link:`http://127.0.0.1/${name_file}`
    },
    code:0
  }
})

Route.post('nav/remove',async ({request,params})=>{
  const {id}=request.all();
  console.log(11,id);
  const nav = await Navs.find(id);
  await nav.delete();
  return {
    data:null,
    code:0
  };
})

Route.post('nav/update',async ({request,params})=>{
  const {id,nav_title,img_link}=request.all();
  console.log(id,nav_title)
  const nav = await Navs
  .find(id)
  nav.nav_title=nav_title;
  nav.icon_img=img_link;
  await nav.save();
  return {
    data:null,
    code:0
  };
})

Route.post('nav/list',async ({request,params,response})=>{
  const {page,page_size}=request.all();
  let nav={};

  if (page_size&&page) {
    nav = await Navs.query().paginate(page,page_size)
  }else{
    nav = await Navs.all()
  }
  // console.log(123123,nav_title,id)
  // const nav = await Navs
  // .query()
  // .where('id', '>', 0)
  // .fetch()
  return {
    code:0,
    data:nav
  };
})

Route.post('block/add',async ({request})=>{
  const {block_title}=request.all();
  const Block = new Blocks();
  Block.block_title=block_title;
  await Block.save();
  return {
    data:null,
    code:0
  };
})

Route.post('block/remove',async ({request,params})=>{
  const {id}=request.all();
  const Block = await Blocks.find(id);
  await Block.delete();
  return {
    data:null,
    code:0
  };
})

Route.post('block/update',async ({request,params})=>{
  const {id,block_title}=request.all();
  const Block = await Blocks
  .find(id)
  Block.block_title=block_title;
  await Block.save();
  return {
    data:null,
    code:0
  };
})

Route.post('block/list',async ({request,params})=>{
  const {page,page_size}=request.all();
  let Block={};
  if (page_size&&page) {
    Block = await Blocks.query().paginate(page,page_size)
  } else {
    Block = await Blocks.all()
  }
  return {
    code:0,
    data:Block
  };
})

Route.post('list/add',async ({request})=>{
  const {title,desc,img_url,link_url,nav_id,block_id}=request.all();
  const List = new Lists();
  List.title=title;
  List.desc=desc;
  List.img_url=img_url;
  List.link_url=link_url;
  await List.save();
  
  await Database
  .table('middles')
  .insert({list_id: List.id, block_id:Number(block_id),nav_id:Number(nav_id)})
  // const Middle = new Middles();
  // console.log(33333,List.id)
  // Middle.list_id = List.id;
  // console.log(4444)
  // Middle.block_id = Number(block_id);
  // console.log(555,block_id)
  // Middle.nav_id = Number(nav_id);
  // console.log(777,nav_id)
  // await Middle.save();
  // console.log(6666)
  return {
    data:null,
    code:0
  };
})

Route.post('list/remove',async ({request,params})=>{
  const {id,list_id}=request.all();
  const middle = await Middles.find(id);
  await middle.delete();

  const List = await Lists.find(list_id);
  await List.delete();
  return {
    data:null,
    code:0
  };
})

Route.post('list/update',async ({request,params})=>{
  const {id,list_id,nav_id,block_id,title,desc,img_url,link_url}=request.all();
  const List = await Lists
  .find(list_id)
  List.title=title;
  List.desc=desc;
  List.img_url=img_url;
  List.link_url=link_url;
  await List.save();
  
  await Database
  .table('middles')
  .update({block_id:Number(block_id),nav_id:Number(nav_id)})
  // const middle = await Middles
  // .find(id)
  // console.log(333333)
  // middle.nav_id=nav_id;
  // middle.block_id=block_id;
  // await middle.save();
console.log(111111)
  
  
  return {
    data:null,
    code:0
  };
})

Route.post('list',async ({request,params})=>{
  const {page,page_size}=request.all();
  // const middles = await Middles.query().paginate(page,page_size)
  // const middles = await Middles.find(1005)
 
  // const jsonData=middles.toJSON();
  // const list = jsonData.data;
  // try {
  //   const cars = await middles
  //   .lists()
  //   .wherePivot('id', 1005)
  //   .fetch()
  //   console.log(middles.toJSON())
  // } catch (error) {
  //   console.log(error)
  // }

  const user=await Database
  .raw('select SQL_CALC_FOUND_ROWS '+
        'middles.*,navs.nav_title,blocks.block_title,lists.title,lists.desc,lists.img_url,lists.link_url '+
        'from middles,navs,blocks,lists '+
        'where middles.nav_id=navs.id and middles.block_id=blocks.id and middles.list_id=lists.id '+
        // 'LIMIT 0,1')
        'LIMIT ?,?',[((page-1)*page_size),Number(page_size)])
  const user1=await Database.raw('SELECT FOUND_ROWS() as total')
  const list=user[0];
  const total=user1[0][0].total;
  
  // try {
  //   const user=await Database
  // .raw(
  //   'SELECT SQL_CALC_FOUND_ROWS block_title from (SELECT nav_title,block_id from middles as m inner join navs as n on m.nav_id=n.id) as mn inner join blocks as b on mn.block_id=b.id'
  //   // as mn ' +
  //   // 'inner join blocks as b on mn.block_id=b.id) as mnb ' +
  //   // 'inner join lists as l on mnb.list_id=l.id LIMIT 0,20'
  //   )
  // const user1=await Database.raw('SELECT FOUND_ROWS() as total')
  // console.log(11111,user[0][0].nav_title,user1)
  // } catch (error) {
  //   console.log(error);
  // }
  
//   const user=await Database
//   .from('navs')
//   .paginate(0, 10)

  return {
    code:0,
    data:{
      list:list,
      total,
      page:page,
      page_size:page_size
    }
  };
})

// 导航网站列表
Route.get('api/list',async ({request,params})=>{
  const {id}=request.all();
  console.log(1111111)
  // try {
    // Logger.info('request url is %s',request.url())
    // Logger.info('request details %j', {
    //   url: request.url(),
    //   user: auth.user.username()
    // })
  // } catch (error) {
  //   console.log(error)
  // }
 
  console.log(1231231232)
  // Logger.info('request url is %s', request.url())
  const user=await Database
  .raw('select '+
        'middles.*,blocks.block_title,lists.title,lists.desc,lists.img_url,lists.link_url,lists.created_at '+
        'from middles,blocks,lists '+
        'where middles.block_id=blocks.id and middles.list_id=lists.id and middles.nav_id=?',[id])
  // const middle = await Middles.find(id);
  // const block = await Blocks.find(middle.block_id);
  // const list = await Lists.find(middle.list_id);
  const list=user[0];
  const data=[];
  const data_index=[];
  
  list.forEach((item)=>{
    if(data_index.indexOf(item.block_id)===-1){
      data_index.push(item.block_id);
      data.push({
        block_id:item.block_id,
        block_title:item.block_title,
        block_list:[
          {
            id:item.list_id,
            title:item.title,
            desc:item.desc,
            img_url:item.img_url,
            link_url:item.link_url,
            created_at:item.created_at,
          }
        ]
      })
    } else {
      const list_data=data.filter((vm)=>{
        return vm.block_id===item.block_id
      })
      list_data[0].block_list.push(
        {
          id:item.list_id,
          title:item.title,
          desc:item.desc,
          img_url:item.img_url,
          link_url:item.link_url,
          created_at:item.created_at,
        }
      )
    }
  })
  return{
    code:0,
    data
  }
})

/** ---jsonp请求处理-- **/
Route.get('testJsonp', async ({ request,response }) => {
  const {callback}=request.all();
  console.log(1111,request.header('content-type'),request.all())
  // response.send(jsonpCallback+("+JSON.stringify({code:0,data:{a:1,b:22}})+"))
//   // return JSON.stringify(jsonpCallback(JSON.stringify({code:0,data:{a:1,b:22}})))
  const data=callback+"("+JSON.stringify({'name': 'jifeng', 'company': 'taobao'})+")";
// console.log(data)
  response.jsonp({'name': 'jifeng', 'company': 'taobao'});
  // return data
})

Route.post('upload', async ({ request }) => {
  // const uInt8Array = new Uint8Array(request._body);
   console.log(1111,request.header('content-type'),request.all())
  

  /** ---json格式图片base64上传-- **/
  // const {base_img}=request.all();
  //  const base64Data = base_img.replace(/^data:image\/\w+;base64,/, "");
  // //  console.log(2222,base64Data)
  //  const dataBuffer = new Buffer.from(base64Data, 'base64'); // 解码图片
  //  console.log(1111,dataBuffer)
  //  try {
  //   await Drive.put('hello.png', dataBuffer)
  //  } catch (error) {
  //    console.log(error)
  //  }
  
   /** ---formData图片上传-- **/
//   const profilePic = request.file('icon_img', {
//     types: ['image'],
//     size: '1mb',
//     extnames: ['png', 'gif']
//   })
  
// console.log(profilePic.subtype,Helpers.tmpPath())
//   await profilePic.move(Helpers.tmpPath(), {
//             name: `${new Date().getTime()}.${profilePic.subtype}`,
//             overwrite: true
//         })

//   if (!profilePic.moved()) {
//     return profilePic.error()
//   }

  return 'File moved'
})

Route.post('uploads', async ({ request }) => {
    console.log(22222, request._files,request.post())
    // request._files.profile_pics.forEach((item)=>{
    //     profilePicFun('profile_pics');
    //     console.log(item.size)
    // })
  const profilePic = request.file('profile_pics', {
    types: ['image'],
    size: '1mb',
    extnames: ['png', 'gif','jpg']
  })
  
  await profilePic.moveAll(Helpers.tmpPath(), (file) => {
      console.log(file.subtype)
    return {
      name: `${new Date().getTime()}.${file.subtype}`
    }
  })

  if (!profilePic.movedAll()) {
    return profilePic.error()
  }
  return {
      'code':200,
      'data':null
    }
})

