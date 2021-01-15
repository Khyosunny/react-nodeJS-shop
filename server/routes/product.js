const express = require('express')
const router = express.Router()
const multer = require('multer')
const { Product } = require('../models/Product')
//=================================
//             Product
//=================================

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`)
  },
})

var upload = multer({ storage: storage }).single('file')

router.post('/image', (req, res) => {
  //가져온 이미지를 저장을 해주면 된다
  upload(req, res, err => {
    if (err) {
      return res.json({ success: false, err })
    }
    return res.json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename,
    }) //파일을 어디다저장했는지, 파일이름은 뭔지 전달
  })
})

router.post('/', (req, res) => {
  //받아온 정보들을 DB에 넣어준다
  const product = new Product(req.body)

  product.save(err => {
    if (err) return res.status(400).json({ success: false, err })
    return res.status(200).json({ success: true })
  })
})

router.post('/products', (req, res) => {
  // product 콜렉션에 들어있는 모든 상품정보를 가져오기

  let limit = req.body.limit ? parseInt(req.body.limit) : 20
  let skip = req.body.skip ? parseInt(req.body.skip) : 0
  let term = req.body.searchTerm

  let findArgs = {}

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === 'price') {
        findArgs[key] = {
          //Greater than equal
          $gte: req.body.filters[key][0],
          //Less than equal
          $lte: req.body.filters[key][1],
        }
      } else {
        findArgs[key] = req.body.filters[key]
      }
    }
  }
  console.log('findArgs', findArgs)

  if (term) {
    Product.find(findArgs)
      .find({ $text: { $search: term } })
      .populate('writer')
      .skip(skip)
      .limit(limit)
      .exec((err, productInfo) => {
        //쿼리 돌리기
        if (err) return res.status(400).json({ success: false, err })
        return res
          .status(200)
          .json({ success: true, productInfo, postSize: productInfo.length })
      })
  } else {
    Product.find(findArgs)
      .populate('writer')
      .skip(skip)
      .limit(limit)
      .exec((err, productInfo) => {
        //쿼리 돌리기
        if (err) return res.status(400).json({ success: false, err })
        return res
          .status(200)
          .json({ success: true, productInfo, postSize: productInfo.length })
      })
  }
})

router.get('/products_by_id', (req, res) => {
  //productId를 이용해서 DB에서 productId와 같은 상품을 가져온다
  let type = req.query.type
  let productIds = req.query.id

  if (type === 'array') {
    //id=12132,1232133,123122 이거를
    //productIds = ['12132','1232133','123122'] 이런식으로 바꿔주기
    productIds = req.query.id.split(',')
  }

  Product.find({ _id: { $in: productIds } })
    .populate('writer')
    .exec((err, product) => {
      if (err) return res.status(400).send(err)
      return res.status(200).send(product)
    })
})

module.exports = router
