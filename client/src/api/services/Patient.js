import { client } from '../axios';

// Create a new patient
export async function createPatient(data) {
  return client.post('/Patient', data);
}
// Get a patient by id
export async function getAllPatients() {
  return client.get('/Patient');
}
// delete a patient by id
export async function deletePatient(id) {
  return client.delete(`/Patient/${id}`);
}
// edit a patient by id
export async function editPatient(id, data) {
  return client.put(`/Patient/${id}`, data);
}
