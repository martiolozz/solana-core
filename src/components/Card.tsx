import { FC } from 'react';
import { Movie } from '../models/Movie';

import '../styles/Card.css'

export interface CardProps {
    movie: Movie;
}

export const Card: FC<CardProps> = (props) => {
  return (
    <div className='MovieCard'>
        <div className="UpContainer">
            <h3 className='UpText'>{props.movie.title}</h3>
            <h3 className='UpText'>{props.movie.rating}/5</h3>
        </div>
        <div className="DescriptionContainer">
            <div className='Description'>{props.movie.description}</div>
        </div>
    </div>
  )
}
