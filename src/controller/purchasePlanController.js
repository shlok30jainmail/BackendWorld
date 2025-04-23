import purchasePlanModel from "../models/purchasePlanModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import { getFormattedDate, addDaysToDate } from "../utils/dateHandler.js";
import { validationResult, query, body } from "express-validator";
import planModel from "../models/planModel.js";
// create purchase plan
export const createPurchasePlan = [
  body("planId").notEmpty().withMessage("Plan Id is required"),
  body("userId").notEmpty().withMessage("User Id is required"),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array().map((err) => err.msg),
      });
    }

    const {
      userId,
      planId,

    } = req.body;

    const nowDate = getFormattedDate();
    const plan = await planModel.findById(planId);
    const endDate = addDaysToDate(nowDate, plan.validity);
    const data = await purchasePlanModel.create({
      userId,
      planId,
      planName: plan.planName,
      planDescription: plan.planDescription,
      planAmount: plan.amount,
      startPlan: nowDate,
      endPlan: endDate,
      productManagement:plan.productManagement,
      serviceManagement: plan.serviceManagement,
      detailedReport: plan.detailedReport,
      keywordReport:plan.keywordReport,
      competitorAnalysis:plan.competitorAnalysis,
      addEvent:plan.addEvent,
      replyWithAI:plan.replyWithAI,
    });


    res.status(201).json({
      success: true,
      message: "Plan Purchased Successfully",
      data: data,
    });
  }),
];

// export const updatePurchasePlan = [
//   query("purchasePlanId").notEmpty().withMessage("Plan Id is required"),

//   asyncHandler(async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({
//         success: false,
//         message: errors.array().map((err) => err.msg),
//       });
//     }

//       const {purchasePlanId} = req.query;
//     const {
//       productManagement,
//       serviceManagement,
//       detailedReport,
//       keywordReport,
//       competitorAnalysis,
//       addEvent,
//       replyWithAI,
//     } = req.body;
//     const data = await purchasePlanModel.findByIdAndUpdate(purchasePlanId, {
//       productManagement,
//       serviceManagement,
//       detailedReport,
//       keywordReport,
//       competitorAnalysis,
//       addEvent,
//       replyWithAI,
//     }, {new:true})


//     res.status(200).json({
//       success: true,
//       message: "Plan Purchased updated Successfully",
//       data: data,
//     });
//   }),
// ];

// get by id purchase plan
export const getPurchasePlanbyId = [
  query("purchasePlanId").notEmpty().withMessage("purchasePlanId is required"),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
        keyName: errors.array()[0].path,
      });
    }
    const { purchasePlanId } = req.query;
    const data = await purchasePlanModel.findById(purchasePlanId);
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Purchase Plan Not Found !",
      });
    }

    res.status(200).json({
      success: true,
      message: "Fetched Purchase PLan Data Successfully",
      data: data,
    });
  }),
];

// filter purchase plan
export const filterPurchasePlan = asyncHandler(async (req, res) => {
  const {
    planId,
    userId,
    sort = -1,
    page = 1,
    limit = 20,
    disable,
  } = req.query;
  const skip = (page - 1) * limit;
  const filter = {
    ...(planId && { planId }),
    ...(userId && { userId }),
    ...(disable && { disable }),
  };
  const data = await purchasePlanModel.find(filter).sort({createdAt:parseInt(sort)}).skip(skip).limit(limit);
  const total = await purchasePlanModel.countDocuments(filter);

  res.status(200).json({
    success: true,
    message: "Purchase Data Filtered Successfully",
    data: data,
    currentPage: page,
    page: Math.ceil(total / limit),
  });
});
