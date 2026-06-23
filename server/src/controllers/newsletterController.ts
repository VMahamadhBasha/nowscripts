import { Request, Response } from "express";
import NewsletterArticle from "../models/newsletter";

export const getArticles = async (req: Request, res: Response) => {
  try {
    const { category, search, limit, page } = req.query;
    
    let query: any = {};
    
    if (category && category !== "All") {
      query.category = category;
    }

    if (search) {
      const searchRegex = new RegExp(search as string, "i");
      query.$or = [
        { title: searchRegex },
        { summary: searchRegex }
      ];
    }

    let limitNum = 20;
    if (limit) {
      limitNum = parseInt(limit as string, 10);
    }

    let pageNum = 1;
    if (page) {
      pageNum = parseInt(page as string, 10);
    }
    
    const skip = (pageNum - 1) * limitNum;

    const articles = await NewsletterArticle.find(query)
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limitNum);

    const total = await NewsletterArticle.countDocuments(query);

    res.status(200).json({
      articles,
      pagination: {
        total,
        page: pageNum,
        pages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    console.error("Error fetching newsletter articles:", error);
    res.status(500).json({ message: "Failed to fetch articles" });
  }
};
