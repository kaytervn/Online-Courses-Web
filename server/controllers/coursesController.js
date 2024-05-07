const createCourse = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Incorrect ID" });
  }

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const { title, price, description } = req.body;
  if (!title || !price || !description) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const user = await User.findById(req.user._id);
  if (!post.user.equals(user._id)) {
    return res.status(401).json({ error: "Not authorized" });
  }

  try {
    const uploadResponse = await new Promise((resolve, reject) => {
      const bufferData = req.file.buffer;
      cloudinary.uploader
        .upload_stream({ resource_type: "image" }, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        })
        .end(bufferData);
    });
    const food = await Food.create({
      cloudinary: uploadResponse.public_id,
      image: uploadResponse.secure_url,
      title,
      price,
      description,
    });
    return res.status(200).json({ food });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
