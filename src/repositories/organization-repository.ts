import type { Organization, Prisma } from "@prisma/client"

export abstract class OrganizationsRepository {
  abstract findById(id: string): Promise<Organization | null>
  abstract findByEmail(email: string): Promise<Organization | null>
  abstract create(data: Prisma.OrganizationCreateInput): Promise<Organization>
}
