// controller/adminController.js
import Admin from '../models/adminModel.js'

export const loginAdmin = async (req, res) => {
  const { username, password } = req.body

  try {
    const admin = await Admin.findOne({ username })

    if (!admin) return res.status(404).json({ message: "Admin not found" })

    // ⚠️ No hashing, direct comparison
    if (admin.password !== password)
      return res.status(401).json({ message: "Invalid password" })

    res.status(200).json({ message: "Login successful", adminId: admin._id })
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message })
  }
}
