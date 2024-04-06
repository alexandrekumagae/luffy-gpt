import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface MessageProps {
  avatar: string
  message: string
  name: string
}

export function Message({ avatar, message, name }: MessageProps) {
  return (
    <div>
      <div className="grid grid-cols-[32px_1fr] items-center gap-2">
        <Avatar className="size-8">
          <AvatarImage src={avatar} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-bold">{name}</div>
        </div>
      </div>
      <div className="grid grid-cols-[32px_1fr] items-center gap-2">
        <div></div>
        <div>
          <p>{message}</p>
        </div>
      </div>
    </div>
  )
}
