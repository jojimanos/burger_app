export default function hello(req, res) {

    const { email, password } = req.body

    console.log( email, password)

    res.status(200).json("kkk")

}