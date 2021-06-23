import React from 'react'
import { useSelector, useDispatch } from "react-redux"
import {getAllTask, addTask, setCurrent,deleteTask, clearCurrent, updateTask, loadUser} from '../redux/actions/actions'
import DatePicker from 'react-date-picker';
import moment from 'moment'
import TimePicker from 'react-time-picker';

const Task = () => {
    const task = useSelector(state => state.loginReducer?.task?.results)
    const current = useSelector(state => state.loginReducer?.selectedTask)
    const users = useSelector(state => state?.loginReducer?.user?.results?.data)
    
    //const loading = useSelector(state => state?.loginReducer?.loading)

    const dispatch = useDispatch()
    
    
    
    const [spicyTask, setSpicyTask] = React.useState({
        assigned_user: users && users[0].name,
        task_date: new Date(),
        task_time: '10:00',
        is_completed:0,
        time_zone: 3000,
        task_msg: ""
      });

      React.useEffect(() => {
        if (current !== null) {
          //fill the form
          setSpicyTask(current);
        } else {
          //clear it
          setSpicyTask({
            assigned_user: "",
            task_date: "",
            task_time: '10:00',
            is_completed:0,
            time_zone: 3000,
            task_msg: ""
          });
        }
      }, [current]);

      React.useEffect(() => {
            dispatch(getAllTask())
          
        dispatch(loadUser())
       
    },[dispatch])
      const {id, assigned_user, task_date, task_time, is_completed, time_zone, task_msg} = spicyTask


    const onDelete = (id) => {
        dispatch(deleteTask(id));
        dispatch(clearCurrent());
    };
    const converDate = moment(task_date).utc().format('YYYY-MM-DD')
    const convertTime = moment(task_time, 'HH:mm:ss: A').diff(moment().startOf('day'), 'seconds');

 
      const onChange = (e, item) => setSpicyTask({ ...spicyTask, [ e.target ? e.target.name : item]: e.target ? e.target.value : e });
      
      const onSubmit = e => {

        e.preventDefault();
        //call method to login
      
        if (current === null) {
            dispatch(addTask({
                assigned_user,
                task_date: converDate,
                task_time: convertTime,
                is_completed,
                time_zone,
                task_msg
            }));
          } else {
            dispatch(updateTask({
                id,
                assigned_user,
                task_date: converDate,
                task_time: convertTime,
                is_completed,
                time_zone,
                task_msg
            }));
          }
          //clear form
          setSpicyTask({
            assigned_user: "",
            task_date: "",
            task_time: '10:00',
            is_completed:0,
            time_zone: 3000,
            task_msg: ""
          });
      };
    return (
        <div className="task-container">
            <div>
            <div>
                TASKS: {task?.length}
            </div>
            <div className="formWrapper">
            <form onSubmit={onSubmit}>
                <div className='container'>
                    <label htmlFor='task_msg'>Task Description</label>
                    <input type='text' name='task_msg' value={task_msg} onChange={onChange} />
                </div>
                
                <div className="date_container">
                    <div className='container'>
                        <div>
                        <label htmlFor='task_date'>Date</label>
                        </div>
                        <div>
                        <DatePicker
                            format='yy-MM-dd'
                            onChange={(e) => onChange(e, "task_date")}
                            value={(spicyTask.task_date)}
                        />
                         </div>
                    </div>
                    <div className='container'>
                        <div>
                            <label htmlFor='task_time'>Time</label>
                        </div>
                        <div>
                            <TimePicker
                                onChange={(e) => onChange(e, "task_time")}
                                disableClock={true}
                                value={spicyTask.task_time}
                            />
                    </div>
                    </div>
                    </div>
              
            
                <div className='container'>
                    <label htmlFor='assigned_user'>Assign User</label>
                          <select name='assigned_user' onChange={onChange} value={assigned_user}>
                            {users?.map((user, i) => (
                            <option key={i} value={user.name}>{user.name}</option>
                            ))}
                        </select>
                </div>
                    <div className="button-wrapper">
                       
                        <div>
                            <button className="clear-button" type="button" onClick={() => dispatch(clearCurrent())}>Clear</button>
                        </div>
                        <div>
                            <input className="save-button" type='submit' value={current ? 'Edit Task' : 'Add Task' }  />
                        </div>
                    </div>
            </form>
            </div>
            </div>
            <div>
            {task?.map((item, i) => (
                <div>
                <ul key={i}>
                    <li>User: {item.assigned_user}</li>
                    <li>Created: {item.created}</li>
                    <li>Date: {item.task_date}</li>
                    <li>Talk Message: {item.task_msg}</li>
                    <li>Task Time: {item.task_time}</li>
                    <li>Time Zone: {item.time_zone}</li>
            <button className='btn btn-dark btn-sm' onClick={() =>  dispatch(setCurrent({
                assigned_user: item.assigned_user,
                task_date: item.task_date,
                task_time: `${ moment.duration(item.task_time).hours()} : ${moment.duration(item.task_time).minutes()}`,
                is_completed: item.is_completed,
                time_zone: item.time_zone,
                task_msg: item.task_msg
            }))}>
            Edit
            </button>
            <button className='btn btn-danger btn-sm' onClick={() => onDelete(item.id)}>
            Delete
            </button>
                </ul>
                </div>
            ))}
            </div>
        </div>
    )
}

export default Task
