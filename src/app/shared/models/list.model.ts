export interface ToDolists
{
  id: bigint,
  userId: bigint,
  startDate?: string,
  endDate?: string,
  isDaily: boolean,
  isSoftDeleted?: boolean,
  listTitle?: string,
  createDateTime: Date,
  tasks?: Tasks[]
}
export interface Tasks
{
  id: bigint,
  toDoListId: bigint,
  taskName: string,
  isFinished: boolean,
  description: string
}

export interface ToDoListDto
{
  startDate: string | null,
  endDate: string | null,
  isDaily: boolean
}