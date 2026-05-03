from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Client, Project, Task


class ClientFlowAPITests(APITestCase):

    def setUp(self):
        self.user1 = User.objects.create_user(
            username="hamza",
            password="pass123"
        )

        self.user2 = User.objects.create_user(
            username="other",
            password="pass123"
        )

        token = RefreshToken.for_user(self.user1)
        self.client.credentials(
            HTTP_AUTHORIZATION=f"Bearer {token.access_token}"
        )

        self.client1 = Client.objects.create(
            name="Client A",
            email="a@test.com",
            phone="0600000000",
            status=2,
            username=self.user1
        )

        self.other_client = Client.objects.create(
            name="Client B",
            email="b@test.com",
            phone="0700000000",
            status=2,
            username=self.user2
        )

        self.project1 = Project.objects.create(
            title="Project A",
            description="Test project",
            deadline="2026-06-01T10:00:00Z",
            status=2,
            client=self.client1
        )

        self.task1 = Task.objects.create(
            title="Task A",
            description="Test task",
            deadline="2026-06-10",
            priority=2,
            project=self.project1
        )

    # ---------- CLIENT ----------

    def test_list_clients_only_current_user(self):
        res = self.client.get("/api/clients/")
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(res.data), 1)

    def test_create_client(self):
        res = self.client.post("/api/clients/", {
            "name": "Client C",
            "email": "c@test.com",
            "phone": "0611111111",
            "status": 2
        })
        self.assertEqual(res.status_code, 201)

    def test_delete_own_client(self):
        res = self.client.delete(f"/api/clients/delete/{self.client1.id}/")
        self.assertEqual(res.status_code, 204)

    def test_cannot_delete_other_user_client(self):
        res = self.client.delete(f"/api/clients/delete/{self.other_client.id}/")
        self.assertEqual(res.status_code, 404)

    # ---------- PROJECT ----------

    def test_list_projects_for_own_client(self):
        res = self.client.get(
            f"/api/clients/{self.client1.id}/projects/"
        )
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(res.data), 1)

    def test_create_project_for_own_client(self):
        res = self.client.post(
            f"/api/clients/{self.client1.id}/projects/",
            {
                "title": "Project B",
                "description": "Another project",
                "deadline": "2026-07-01T10:00:00Z",
                "status": 2
            }
        )
        self.assertEqual(res.status_code, 201)

    def test_cannot_create_project_for_other_user_client(self):
        res = self.client.post(
            f"/api/clients/{self.other_client.id}/projects/",
            {
                "title": "Hack",
                "description": "Should fail",
                "deadline": "2026-07-01T10:00:00Z",
                "status": 2
            }
        )
        self.assertEqual(res.status_code, 404)

    def test_delete_own_project(self):
        res = self.client.delete(
            f"/api/clients/{self.client1.id}/project/delete/{self.project1.id}/"
        )
        self.assertEqual(res.status_code, 204)

    # ---------- TASK ----------

    def test_list_tasks_for_own_project(self):
        res = self.client.get(
            f"/api/clients/{self.client1.id}/projects/{self.project1.id}/tasks/"
        )
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(res.data), 1)

    def test_create_task_for_own_project(self):
        res = self.client.post(
            f"/api/clients/{self.client1.id}/projects/{self.project1.id}/tasks/",
            {
                "title": "Task B",
                "description": "Another task",
                "deadline": "2026-06-15",
                "priority": 2
            }
        )
        self.assertEqual(res.status_code, 201)

    def test_delete_own_task(self):
        res = self.client.delete(
            f"/api/clients/{self.client1.id}/project/{self.project1.id}/task/delete/{self.task1.id}/"
        )
        self.assertEqual(res.status_code, 204)

    # ---------- SECURITY ----------

    def test_unauthenticated_cannot_access_clients(self):
        self.client.credentials()
        res = self.client.get("/api/clients/")
        self.assertEqual(res.status_code, 401)