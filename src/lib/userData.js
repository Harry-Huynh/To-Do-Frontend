import { getToken } from "./authenticate";

export async function getTasks() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks`, {
    method: "GET",
    headerS: {
      Authorization: `JWT ${getToken()}`,
    },
  });

  const data = await res.json();

  if (res.status === 200) {
    return data;
  } else {
    return [];
  }
}

export async function addTask(name, status, edit) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks`, {
    method: "POST",
    body: JSON.stringify({ name: name, status: status, edit: edit }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${getToken()}`,
    },
  });

  const data = await res.json();

  if (res.status === 200) {
    return data;
  } else {
    return [];
  }
}

export async function updateTask(id, name, status, edit) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks/${id}`,
    {
      method: "PUT",
      body: JSON.stringify({ name: name, status: status, edit: edit }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${getToken()}`,
      },
    }
  );

  const data = await res.json();

  if (res.status === 200) {
    return data;
  } else {
    return [];
  }
}

export async function deleteTask(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `JWT ${getToken()}`,
      },
    }
  );

  const data = await res.json();

  if (res.status === 200) {
    return data;
  } else {
    return [];
  }
}
