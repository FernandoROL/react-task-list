import { useEffect, useState } from "react"
import "./style.css"
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase_connection";
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc, where } from "firebase/firestore";

export default function Admin() {

    const [taskInput, setTaskInput] = useState('');
    const [user, setUser] = useState({});
    const [tasks, setTasks] = useState([]);
    const [edit, setEdit] = useState('');

    useEffect(() => {
        async function loadTasks() {
            const userDetail = localStorage.getItem("@detailUser");
            setUser(JSON.parse(userDetail))

            if (userDetail) {
                const data = JSON.parse(userDetail);

                const taskRef = collection(db, "tasks");
                const q = query(taskRef, orderBy("created", "desc"), where("userUid", "==", data?.uid));
                const onSub = onSnapshot(q, (snapshot) => {
                    let list = [];

                    snapshot.forEach((doc) => {
                        list.push({
                            id: doc.id,
                            task: doc.data().task,
                            userUid: doc.data().userUid
                        });
                    });
                    // console.log(list);
                    setTasks(list);
                })
            }
        }

        loadTasks();
    }, [])

    async function handleRegister(e) {
        e.preventDefault();

        if (taskInput === '') {
            alert('Input your task...');
            return;
        }

        if (edit?.id){
            handleTaskUpdate();
            return;
        }

        await addDoc(collection(db, "tasks"), {
            task: taskInput,
            created: new Date(),
            userUid: user?.uid
        })
            .then(() => {
                console.log("Task registered with success!");
                setTaskInput('');
            })
            .catch((error) => {
                console.log("Error registering task: " + error);
            })
    }

    async function handleLogout() {
        if (!confirm("Do you really wish to logout?")) {
            return;
        }
        await signOut(auth);
    }

    function finishTask(taskID) {
        if(!confirm("Do you really wish to complete task?")){
            return;
        }
        let docRef = doc(db, "tasks", taskID);
        deleteDoc(docRef);
    }

    function editTask(taskToEdit) {
        setTaskInput(taskToEdit.task);
        setEdit(taskToEdit);
    }

    async function handleTaskUpdate() {

        if(!confirm(`Do you really wish to update your task to "${taskInput}"?`)){
            setTaskInput('');
            setEdit({});
            return;
        }

        const docRef = doc(db, "tasks", edit?.id);
        await updateDoc(docRef, {
            task: taskInput
        })
        .then(() => {
            console.log("Task updated.");
            setTaskInput('');
            setEdit({});
        })
        .catch((error) => {
            console.log("ERROR UPDATING TASK: "+ error);
            setTaskInput('');
            setEdit({});
        })
    }

    return (
        <div className="admin-container">
            <h1>My task list</h1>

            <form className="login-form" onSubmit={handleRegister}>
                <textarea
                    placeholder="Input your task..."
                    value={taskInput}
                    onChange={(e) => setTaskInput(e.target.value)}
                />

                {Object.keys(edit).length > 0 ? (
                    <button type="submit" style={{backgroundColor: 'rgb(200, 150, 100)'}} className="register-btn">Update task</button>
                ): (
                    <button type="submit" className="register-btn">Add task</button>
                )}
            </form>

            {tasks.map((item) => {
                return (
                    <article className="list" key={item.id}>
                        <p>{item.task}</p>
                        <div>
                            <button onClick={() => editTask(item)}>Edit</button>
                            <button className="delete-btn" onClick={() => finishTask(item.id)}>Finish task</button>
                        </div>
                    </article>
                )
            })}

            <button className="logout-btn" onClick={handleLogout}>Exit</button>

        </div>
    )
}