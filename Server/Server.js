const express = require('express')
const cors  = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const authenticationRouter = require('././routes/Authentication/authRoute')
const adminProductRouter = require('././routes/Admin/Product-routes')
const shoppingProductRouter = require('././routes/Shopping/Product-route')
const cartRouter = require('././routes/Shopping/Cart-routes')
const addressRouter = require('././routes/Shopping/Address-routes')
const shoppingOrderRouter = require('././routes/Shopping/Order-route')
const adminOrderRouter = require('././routes/Admin/Order-route')
const searchRouter = require('././routes/Shopping/Searh-routes')
const reviewRouter = require('././routes/Shopping/Review-routes')
const featuresRouter = require('././routes/Common/Feature-route')

require('dotenv').config()

const app  = express()
const port =  process.env.PORT || 7000

mongoose.connect(process.env.MongoUrl)
.then(()=>console.log('connected to the database'))
.catch(console.log('some error occured in connecting DB'))




app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin:process.env.Client_Side_Url,
    methods: ["GET","POST","PUT","DELETE"],
    allowedHeaders:[
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma",
    ],
    credentials: true
}))
app.use('/api/auth', authenticationRouter)
app.use('/api/admin/products',adminProductRouter)
app.use('/api/admin/orders',adminOrderRouter)
app.use('/api/shopping/products',shoppingProductRouter)
app.use('/api/shopping/cart',cartRouter)
app.use('/api/shopping/address',addressRouter)
app.use('/api/shopping/orders',shoppingOrderRouter)
app.use('/api/shopping/search',searchRouter)
app.use('/api/shopping/review',reviewRouter)
app.use('/api/common/features',featuresRouter)







app.listen(port, () => console.log(`Server is running on port no ${port}`))