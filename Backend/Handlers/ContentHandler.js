import Content from "../Models/Content.js";

export const getContent = async (req, res) => {
  try {
    let content = await Content.findOne();

    if (!content) {
      content = await Content.create({});
    }

    res.json(content);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateContent = async (req, res) => {
  try {
    let content = await Content.findOne();

    if (!content) {
      content = new Content(req.body);
    } else {
      Object.assign(content, req.body);
    }

    await content.save();

    res.json(content);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
