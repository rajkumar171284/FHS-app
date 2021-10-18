express=require('express')
router=express.Router()

router.post('/add', async (req,res) => {
console.log(req.body)
})
module.exports=router