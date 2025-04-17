import Event from "../models/eventModel.js";
import { deleteFileMulter } from "../middleware/multer.js";

export const createEvent = async (req, res) => {
  const { title, description, date, time } = req.body;
  const image = req.file.location;

  try {
    const data = await Event.create({
      title,
      description,
      date,
      time,
      image,
    });

    res.status(201).json({
      success: true,
      data: "Event Created Successfully",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getEvent = async (req, res) => {
  const { eventId } = req.query;
  if (!eventId) {
    return res.status(400).json({
      success: false,
      message: "Event Id is required",
    });
  }
  try {
    const data = await Event.findById(eventId);

    res.status(200).json({
      success: true,
      data: "Event Fetched Successfully",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateEvent = async (req, res) => {
  const { eventId } = req.query;
  const { title, description, date, time } = req.body;
  const image = req.file.location;
  const updatedData = { title, description, date, time };

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    if (image) {
      deleteFileMulter(event?.image);
      updatedData.image = image;
    }

    const data = await Event.findByIdAndUpdate(eventId, updatedData, {
      new: true,
    });

    res.status(200).json({
      success: true,
      data: "Event Updated Successfully",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteEvent = async (req, res) => {
  const { eventId } = req.query;
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event Not Found !",
      });
    }

    const data = await Event.findByIdAndDelete(eventId);
    return res.status(200).json({
      success: true,
      message: "Event Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const filterEvent = async (req, res) => {
  const { title, date, time, limit = 20, page = 1, sort = -1 } = req.query;
  const skip = (page - 1) * limit;
  try {
    const query = {
      ...(title && { title: new RegExp(title, "i") }),
      ...(date && { date }),
      ...(time && { time }),
    };

    const data = await Event.find(query)
      .sort({ createdAt: parseInt(sort) })
      .skip(skip)
      .limit(limit);
    const total = await Event.countDocuments(query);

    res.status(200).json({
      success: true,
      message: "All Event Fetched Successfully",
      data: data,
      currentPage: page,
      page: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// This function checks every second for expired events

export const startEventCleanup = () => {
  setInterval(async () => {
    const now = new Date();
  // console.log("hi");
    try {
      const allEvents = await Event.find();

      for (const event of allEvents) {
        const eventDate = new Date(event.date); // e.g., 2025-04-16T00:00:00.000Z
        const eventTimeParts = event.time.match(/(\d+):(\d+)\s*(AM|PM)/i);

        if (!eventTimeParts) continue; // skip if time is invalid

        let hours = parseInt(eventTimeParts[1], 10);
        const minutes = parseInt(eventTimeParts[2], 10);
        const ampm = eventTimeParts[3].toUpperCase();

        if (ampm === "PM" && hours !== 12) hours += 12;
        if (ampm === "AM" && hours === 12) hours = 0;

        // Combine date and time into one Date object
        const eventDateTime = new Date(eventDate);
        eventDateTime.setHours(hours);
        eventDateTime.setMinutes(minutes);
        eventDateTime.setSeconds(0);
        eventDateTime.setMilliseconds(0);

        if (eventDateTime < now) {
          await Event.findByIdAndDelete(event._id);
          console.log(`Deleted expired event: ${event.title}, ID: ${event._id}`);
        }
      }
    } catch (err) {
      console.error("Error checking for expired events:", err.message);
    }
  }, 1000); // Check every second
};


startEventCleanup();


