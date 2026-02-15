export const AdminLogin = async (req, res) => {
  try {
    const { email, pass } = req.body;

    if (!email || !pass) {
      return res.status(400).json({
        success: false,
        msg: "Enter all fields"
      });
    }

    if (
      email === process.env.admin &&
      pass === process.env.pass
    ) {
      return res.status(200).json({
        success: true,
        msg: "Authentication successful"
      });
    } else {
      return res.status(401).json({
        success: false,
        msg: "Authentication failed"
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: err.message
    });
  }
};
