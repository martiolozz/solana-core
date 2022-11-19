import { FC } from 'react';
import { Student } from '../models/Student';
import '../styles/StudentCard.css'

export interface StudentCardProps {
  student: Student;
}

export const StudentCard: FC<StudentCardProps> = (props) => {
  return (
    <div className='StudentCard'>
      <div className="UpContainer">
            <h3 className='UpText'>{props.student.name}</h3>
        </div>
        <div className="DescriptionContainer">
            <div className='Description'>{props.student.message}</div>
        </div>
    </div>
  )
}