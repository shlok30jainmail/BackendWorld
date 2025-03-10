export const datefilter = async (req, res, next) => {
    const filter = req.query.filter;

    if (!filter) {
      next();
      return;
    }
    
    if (
      filter != "today" &&
      filter != "week" &&
      filter != "month" &&
      filter != "year" &&
      filter != "total" &&
      filter != "manually" &&
      filter != "todays" &&
      filter != "totals"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "'today'.'week'.'month'.'year'.'total'.'manually' this are filters only",
      });
    }
  
    if (filter === "total") {
      next();
    }

    if (filter === "totals") {
      next();
    }
    if (filter === "todays") {
      next();
    }
  
    if (filter === "year") {
      const currentYear = new Date().getFullYear();
      const firstDay = new Date(`${currentYear}-01-01`);
      const lastDay = new Date(`${currentYear}-12-31`);
  
      req.uri = { createdAt: { $gte: firstDay, $lte: lastDay } };
      next();
    }
  
    if (filter === "month") {
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth();
      const firstDay = new Date(currentYear, currentMonth, 1);
      const lastDay = new Date(currentYear, currentMonth, 31);
      req.uri = { createdAt: { $gte: firstDay, $lte: lastDay } };
      next();
    }

    if (filter === "today") {
      const firstDay = new Date().setHours(1);
      const lastDay = new Date().setHours(24);
  
      req.uri = { createdAt: { $gte: firstDay, $lte: lastDay } };
      next();
    }
  
    if (filter === "week") {
      let curr = new Date();
      let firstDay = new Date(curr.setDate(curr.getDate() - curr.getDay()));
      let lastDay = new Date(curr.setDate(curr.getDate() - curr.getDay() + 6));
 
      req.uri = { createdAt: { $gte: firstDay, $lte: lastDay } };
      next();
    }

    if (filter === "manually") { 
      if (req.query.startDate && req.query.endDate) {
        let firstday = new Date(req.query.startDate);
        let lastday = new Date(req.query.endDate);
        req.uri = {
            createdAt: { $gte: firstday.setHours(1), $lte: lastday.setHours(24) },
        }
        next();
      } else {
        return res.status(400).send({
          success: false,
          message: "please provide startDate and endDate",
        });
      }
    }
  };