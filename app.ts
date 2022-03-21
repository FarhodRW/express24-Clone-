import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import 'dotenv/config'
import userRouter from './src/router/user.router'
import adminRouter from './src/router/admin.router'
import categoryRouter from './src/router/category.router'
import storeRouter from './src/router/store.router'
import menuRouter from './src/router/menu.router'
import uploadRouter from './src/router/upload.router'

const app = express();

mongoose.connect(String(process.env.DBURL))
  .then(() => console.log('Connected to database'))
  .catch(() => console.log("Can't connect to the database"))

mongoose.set('debug', true)

app.use(express.json())
app.use(morgan('tiny'))

app.use('/user', userRouter)
app.use('/admin', adminRouter)
app.use('/category', categoryRouter)
app.use('/store', storeRouter)
app.use('/menu', menuRouter)
app.use('/upload', uploadRouter)



app.use((err, req, res, next) => {
  console.log('errorrrrrrrrrrr: ', err)
  res.status(500).send(err)
})

app.listen(String(process.env.PORT), () => {
  console.log(`Connected to port ${String(process.env.PORT)}`)
})
