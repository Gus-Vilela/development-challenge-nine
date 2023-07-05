import { client } from '../axios';

export async function createPatient(data) {
  return client.post('/Patient', data);
}
export async function getAllPatients() {
  return client.get('/Patient');
}
export async function deletePatient(id) {
  return client.delete(`/Patient/${id}`);
}
export async function editPatient(id) {
  return client.put(`/Patient/${id}`);
}
