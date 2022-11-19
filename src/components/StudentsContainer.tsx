import { useEffect, useState } from 'react'
import { StudentCard } from './StudentCard'
import { Student } from '../models/Student'
import '../styles/StudentsContainer.css'
import * as web3 from '@solana/web3.js'

const STUDENT_INTRO_PROGRAM_ID = 'HdE95RSVsdb315jfJtaykXhXY478h53X6okDupVfY9yf'

function StudentsContainer() {

    const connection = new web3.Connection(web3.clusterApiUrl('devnet'))
    const [students, setStudents] = useState<Student[]>([])

    useEffect(() => {
        connection.getProgramAccounts(new web3.PublicKey(STUDENT_INTRO_PROGRAM_ID))
        .then(async (accounts) => {
            const students: Student[] = accounts.reduce((accum: Student[], { pubkey, account }) => {
                const student = Student.deserialize(account.data)
                if (!student) {
                    return accum
                }

                return [...accum, student]
            }, [])
            setStudents(students)
        })
    }, [])

  return (
    <div className='StudentsContainer'>
        <h2>Students Introduction</h2>
        {students.map((student, i) => <StudentCard key={i} student={student} /> )}
    </div>
  )
}

export default StudentsContainer