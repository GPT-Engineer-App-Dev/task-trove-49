import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [date, setDate] = useState(new Date());

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { title: newTask, completed: false, dueDate: date }]);
      setNewTask("");
    }
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Inbox</h1>
        <Button onClick={addTask}>Add Task</Button>
      </header>
      <div className="space-y-4">
        {tasks.map((task, index) => (
          <Card key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Checkbox checked={task.completed} onCheckedChange={() => toggleTaskCompletion(index)} />
              <div>
                <p className={`text-lg ${task.completed ? "line-through" : ""}`}>{task.title}</p>
                <p className="text-sm text-muted-foreground">{format(task.dueDate, "PPP")}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" onClick={() => setSelectedTask(task)}>Edit</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Task</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Label>Title</Label>
                    <Input value={selectedTask?.title || ""} onChange={(e) => setSelectedTask({ ...selectedTask, title: e.target.value })} />
                    <Label>Description</Label>
                    <Textarea value={selectedTask?.description || ""} onChange={(e) => setSelectedTask({ ...selectedTask, description: e.target.value })} />
                    <Label>Due Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline">{format(date, "PPP")}</Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <Calendar mode="single" selected={date} onSelect={setDate} />
                      </PopoverContent>
                    </Popover>
                    <Button onClick={() => {
                      const updatedTasks = tasks.map((t) => (t === selectedTask ? selectedTask : t));
                      setTasks(updatedTasks);
                      setSelectedTask(null);
                    }}>Save</Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Button variant="destructive" size="sm" onClick={() => deleteTask(index)}>Delete</Button>
            </div>
          </Card>
        ))}
      </div>
      <div className="mt-4">
        <Input value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="New task" />
      </div>
    </div>
  );
};

export default Index;