import { AuditableModel } from "./auditableModel";

export interface Teacher extends AuditableModel  {
    id: string;
    name: string;
    description: string;
    isMale: boolean;
    code: string;
    sample: string;
}

export interface CreateTeacherRequest {
    name: string;
    description: string;
    isMale: boolean;
    code: string;
    sample: string;
}
