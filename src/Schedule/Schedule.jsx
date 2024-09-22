import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import axios from 'axios';
import { TextField, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import { format } from 'date-fns';

const StyledTimePicker = styled(TimePicker)(({ theme }) => ({
  '& .MuiInputBase-root': {
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.background.paper,
    color: theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.text.primary,
    borderRadius: theme.shape.borderRadius,
    height: '40px',
    '& fieldset': {
      border: 'none',
    },
  },
  '& .MuiInputBase-input': {
    padding: '8px 14px',
    fontSize: '1rem',
  },
  '& .MuiIconButton-root': {
    color: theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.text.primary,
  },
}));
const StyledDatePicker = styled(DatePicker)(({ theme }) => ({
  '& .MuiInputBase-root': {
    // backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.background.paper,
    // color: theme.palette.mode === 'dark' ? theme.palette.common.black : theme.palette.text.graydark,
    color: '#000',
    borderRadius: theme.shape.borderRadius,
    height: '40px',
    '& fieldset': {
      border: 'none',
    },
  },
  '& .MuiInputBase-input': {
    padding: '8px 14px',
    fontSize: '1rem',
  },
  '& .MuiIconButton-root': {
    color: theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.text.primary,
  },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.text.primary,
  '& .MuiSelect-icon': {
    color: theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.text.primary,
  },
}));

const SchedulePaper = () => {
  const [paperName, setpaperName] = useState('');
  const [className, setClassName] = useState('');
  const [subject, setSubject] = useState('');
  const [marks, setMarks] = useState('');
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [marksError, setMarksError] = useState('');
  const [durationError, setDurationError] = useState('');

  const subjects = ['Math', 'Science', 'History', 'English', 'Computer Science'];

  const validateMarks = (value) => {
    // Regular expression to allow only digits (0-9)
    const regex = /^[0-9]*$/;

    if (!regex.test(value)) {
      setMarksError("Marks can only contain numbers");
    } else if (value < 0) {
      setMarksError("Marks cannot be negative");
    } else {
      setMarksError('');
    }

    // Update the state only if the value is valid
    setMarks(value);
  };

  const validateDuration = (value) => {
    // Regular expression to allow only digits (0-9)
    const regex = /^[0-9]*$/;

    if (!regex.test(value)) {
      setDurationError("Duration can only contain numbers");
    } else if (value < 0) {
      setDurationError("Duration cannot be negative");
    } else {
      setDurationError('');
    }

    // Update the state only if the value is valid
    setDuration(value);
  };


  const formatDateForDB = (dateValue) => {
    if (!dateValue) return '';
    return format(dateValue, 'MM/dd/yyyy');
  };

  const formatTimeForDB = (timeDate) => {
    if (!timeDate) return '';
    return format(timeDate, 'hh:mm aa');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!marksError && !durationError) {
      const paperData = {
        paperName,
        className,
        subject,
        marks,
        duration,
        date: formatDateForDB(date),
      time: formatTimeForDB(time),
      };

      try {
        await axios.post('http://localhost:5000/teacher/schedule-paper', paperData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        alert('Paper scheduled successfully');

        // Clear form fields after successful submission
        setpaperName('');
        setClassName('');
        setSubject('');
        setMarks('');
        setDuration('');
        setDate(null);
        setTime(null);
      } catch (error) {
        console.error('Error scheduling paper:', error);
      }
    }
  };

  return (
    <div className={`max-w-xl mx-auto mt-10 p-6 bg-container-light dark:bg-container-dark shadow-md rounded-lg transition-all duration-500}`}>
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-left dark:text-white text-primary">Schedule a Paper</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div  className="grid grid-cols-2 pb-8 gap-x-8 gap-y-6">

       {/* Class Name Input */}
       <div className='flex justify-start items-center gap-10 col-span-2'>
          <label className="block dark:text-white text-wrap text-lg w-full font-semibold">Course Name</label>
          <select
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            required
            className="w-full px-3 py-2 border-none rounded-md shadow-md text-graydark focus:outline-none focus:ring-1 focus:ring-primary appearance-none leading-tight focus:shadow-outline"
          >
            <option value="" disabled>--Select a course--</option>
            <option value="mtech">M.Tech.</option>
            <option value="mca">MCA</option>
          </select>
        </div>

        {/* Paper name */}
        <div className='space-y-2 '>
          <label className="block dark:text-white text-wrap w-full font-semibold">Paper Type</label>
          <select
            value={paperName}
            onChange={(e) => setpaperName(e.target.value)}
            required
            className="w-full px-3 py-2 border-none rounded-md shadow-md text-graydark focus:outline-none focus:ring-1 focus:ring-primary appearance-none leading-tight focus:shadow-outline"
          >
            <option value="" disabled>--Select paper type--</option>
            <option value="test1">Test 1</option>
            <option value="test2">Test 2</option>
            <option value="test3">Test 3</option>
            <option value="endsem">End Sem</option>
          </select>
        </div>

        {/* Subject Dropdown */}
        <div className='space-y-1 text-[#cccacd] dark:text-[#cccacd]'>
          <label className="block w-full text-[#000] dark:text-white font-semibold mb-1">Subject</label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            className="w-full px-3 py-2 border-none rounded-md shadow-md text-graydark focus:outline-none focus:ring-1 focus:ring-primary appearance-none leading-tight focus:shadow-outline"
          >
            <option value="" disabled>--Select a subject--</option>
            {subjects.map((subj, index) => (
              <option key={index} value={subj} className="text-black">
                {subj}
              </option>
            ))}
          </select>
        </div>

        {/* Marks Input */}
        <div className='space-y-1'>
          <label className="block w-full text-gray-700 font-semibold mb-1">Marks</label>
          <input
            type="tel"
            value={marks}
            onChange={(e) => validateMarks(e.target.value)}
            className="w-full px-3 py-2 border-none rounded-md placeholder:text-graydark shadow-md focus:outline-none focus:ring-1 focus:ring-primary appearance-none dark:text-black leading-tight focus:shadow-outline"
            placeholder="Enter marks"
            required
          />
          {marksError && <p className="text-red-500 text-xs mt-1 ml-2">{marksError}</p>}
        </div>

        {/* Duration Input */}
        <div className='space-y-1'>
          <label className="block w-full font-semibold mb-1">Duration (in minutes)</label>
          <input
            type="tel"
            value={duration}
            onChange={(e) => validateDuration(e.target.value)}
            className="w-full px-3 py-2 border-none rounded-md shadow-md placeholder:text-graydark focus:outline-none focus:ring-1 focus:ring-primary appearance-none dark:text-black leading-tight focus:shadow-outline"
            placeholder="Enter duration"
            required
          />
          {durationError && <p className="text-red-500 text-xs mt-1">{durationError}</p>}
        </div>

        {/* Date Picker */}
        <div className='space-y-1 '>
          <label className="block w-full font-semibold mb-1">Date</label>
          <div className='w-full dark:bg-white rounded-md shadow-md'>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <StyledDatePicker
                value={date}
                onChange={(newDate) => setDate(newDate)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                   
                  />
                )}
              />
            </LocalizationProvider>
          </div>
        </div>

        {/* Time Picker */}
        <div className='space-y-1'>
          <label className="block w-full text-gray-700 dark:text-gray-300 font-semibold mb-1">Time: (12 hrs format)</label>
          <div className='w-full dark:bg-gray-800 rounded-md shadow-md'>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <StyledTimePicker
                value={time}
                onChange={(newTime) => setTime(newTime)}
                ampm={true}
                views={['hours', 'minutes']}
                inputFormat="hh:mm a"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    fullWidth
                    required
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <StyledSelect
                          value={time ? (time.getHours() >= 12 ? 'PM' : 'AM') : 'AM'}
                          onChange={(e) => {
                            const newTime = new Date(time || new Date());
                            if (e.target.value === 'PM' && newTime.getHours() < 12) {
                              newTime.setHours(newTime.getHours() + 12);
                            } else if (e.target.value === 'AM' && newTime.getHours() >= 12) {
                              newTime.setHours(newTime.getHours() - 12);
                            }
                            setTime(newTime);
                          }}
                        >
                          <MenuItem value="AM">AM</MenuItem>
                          <MenuItem value="PM">PM</MenuItem>
                        </StyledSelect>
                      ),
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </div>
        </div>

        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-primary-light dark:bg-primary-dark hover:bg-hover-light dark:hover:bg-hover-dark transition text-white font-bold py-2 px-4 rounded-md"
          disabled={marksError || durationError}
        >
          Schedule Paper
        </button>
       
      </form>
    </div>
  );
};

export default SchedulePaper;
