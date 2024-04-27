import { Link } from 'react-router-dom'

import { Card, CardTitle, CardDescription, CardHeader } from './ui/card'
import { ReactNode } from 'react'

interface OptionCardProps {
  title: string
  link: string
  icon: ReactNode
  description: string
}

export function OptionCard({
  title,
  link,
  icon,
  description,
}: OptionCardProps) {
  return (
    <Link to={link}>
      <Card>
        <CardHeader>
          <CardTitle className="mb-4 flex justify-between gap-4">
            {title} {icon}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  )
}
