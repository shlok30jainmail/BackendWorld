import planModel from "../models/planModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import { query, validationResult } from "express-validator";

// create Plan
export const createPlan = asyncHandler(async (req, res) => {
  const {
    validity,
    planName,
    planDescription,
    amount,
    productManagement,
    serviceManagement,
    detailedReport,
    keywordReport,
    competitorAnalysis,
    addEvent,
    replyWithAI,
  } = req.body;

  const data = await planModel.create({
    validity,
    planName,
    planDescription,
    amount,
    productManagement,
    serviceManagement,
    detailedReport,
    keywordReport,
    competitorAnalysis,
    addEvent,
    replyWithAI,
  });

  res.status(200).json({
    success: true,
    message: "Plan Created Successfully",
    data: data,
  });
});

// get plan by id
export const getPlanById = [
  query("planId").notEmpty().withMessage("planId is required"),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
        keyName: errors.array()[0].path,
      });
    }
    const { planId } = req.query;
    const plan = await planModel.findById(planId);
    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Plan not found !",
      });
    }
    res.status(201).json({
      success: true,
      message: "Plan fetched successfully",
      plan: plan,
    });
  }),
];

// update plan by id
export const updatePlanById = [
  query("planId").notEmpty().withMessage("planId is required"),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
        keyName: errors.array()[0].path,
      });
    }
    const { planId } = req.query;
    const {
      validity,
      planName,
      planDescription,
      amount,
      productManagement,
      serviceManagement,
      detailedReport,
      keywordReport,
      competitorAnalysis,
      addEvent,
      replyWithAI,
    } = req.body;
    const plan = await planModel.findById(planId);
    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Plan not found !",
      });
    }
    const data = await planModel.findByIdAndUpdate(
       planId,
      {
        validity,
        planName,
        planDescription,
        amount,
        productManagement,
        serviceManagement,
        detailedReport,
        keywordReport,
        competitorAnalysis,
        addEvent,
        replyWithAI,
      }
    );

    res.status(201).json({
      success: true,
      message: "Plan updated successfully",
      data: data,
    });
  }),
];

// disable plan
export const disablePlanById = [
  query("planId").notEmpty().withMessage("planId is required"),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
        keyName: errors.array()[0].path,
      });
    }
    const { planId } = req.query;
    const plan = await planModel.findById(planId);
    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Plan not found !",
      });
    }
    const data = await planModel.findByIdAndUpdate(
       planId,
      { disable: !plan.disable }
    );

    res.status(200).json({
      success: true,
      message:
        data.disable === true
          ? "Plan Disabled Successfully"
          : "Plan Enabled Successfully",
    });
  }),
];

// filter plan
export const filterPlan = asyncHandler(async (req, res) => {
  const {
    disable,
    sort = -1,
    limit = 20,
    planName,
    validity,
    page = 1,
  } = req.query;
  const skip = (page - 1) * limit;
  const filter = {
    ...(disable && { disable }),
    ...(planName && { planName: new RegExp(planName, "i") }),
    ...(validity && { validity }),
  };
  const data = await planModel.find(filter).sort({createdAt:parseInt(sort)}).skip(skip).limit(limit);
  const totalPlan = await planModel.countDocuments(filter);

  res.status(200).json({
    success: true,
    message: "Plans Fetched Successfully",
    data: data,
    currentPage: page,
    page: Math.ceil(totalPlan / limit),
  });
});
