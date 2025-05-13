const Timetable = require('../models/TimeTable');

exports.getTimetable = async (req, res, next) => {
  try {
    let timetable = await Timetable.findOne({ week: 'default' });
    if (!timetable) {
      // Initialize if not exists
      const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => ({
        name: day,
        periods: Array(8).fill({ subject: '' })
      }));
      timetable = new Timetable({ days });
      await timetable.save();
    }
    res.json({ timetable });
  } catch (err) {
    next(err);
  }
};

exports.updateTimetable = async (req, res, next) => {
  try {
    const { days } = req.body; // Expecting an array of days with periods
    let timetable = await Timetable.findOne({ week: 'default' });
    if (!timetable) {
      timetable = new Timetable({ days });
    } else {
      timetable.days = days;
    }
    await timetable.save();
    res.json({ message: 'Timetable updated', timetable });
  } catch (err) {
    next(err);
  }
};
