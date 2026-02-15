import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
  heroTitle: String,
  heroSubtitle: String,
  overview: String,
  nearby: String,
  amenities: [
    { title: String, description: String }
  ],
  about: String,
  constructionUpdates: [
    { label: String }
  ],
  faq: [
    { question: String, answer: String }
  ]
});

export default mongoose.model("Content", contentSchema);
