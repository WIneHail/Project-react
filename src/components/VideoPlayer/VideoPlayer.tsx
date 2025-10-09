import { FC } from "react";
import ReactPlayer from 'react-player'
import './style.scss'

interface VideoPlayerProps {
  videoId: string,
}
export const VideoPlayer: FC<VideoPlayerProps> = ({
  videoId
}) => {

  return (
    <div className="video__wrapper" >
      <ReactPlayer
        src={`https://www.youtube.com/watch?v=${videoId}`}
        controls={false}
        style={{
          borderRadius: 'unset',
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  )
}