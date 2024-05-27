import { apiDelete, apiGet, apiPatch, apiPost } from "src/utils/api-request";
import { StudentInfo, StudentInfoDetail } from "src/types/student-info";

type StudentInfoResponse = Promise<StudentInfoDetail>;

export class StudentInfoApi {
  static async createStudentInfo(
    request: Omit<StudentInfo, "id">
  ): Promise<number> {
    return await apiPost("/students/create", request);
  }

  static async getStudentInfoList(request: FormData): Promise<StudentInfo[]> {
    const response = await apiGet("/students", request);
    return response;
  }

  static async updateStudentInfo(
    request: Partial<StudentInfo>
  ): Promise<StudentInfoDetail> {
    const response = await apiPatch("/students/" + request.id, request);
    return response.data;
  }

  static async deleteStudentInfo(id: string): Promise<void> {
    await apiDelete(`/students/${id}`, { id });
  }
}
