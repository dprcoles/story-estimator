import { Mapper } from "src/application/common/mapper";
import { JiraIntegration } from "src/domain/models/jira-integration.model";
import { JiraIntegrationDto } from "../dtos/jira-integration.dto";
import { GetJiraIntegrationResponse } from "../responses/jira-integration.response";

export class JiraIntegrationMap extends Mapper<JiraIntegration> {
  public static toDomain(dto: JiraIntegrationDto): JiraIntegration {
    return {
      id: dto.id,
      configuredById: dto.configuredById,
      domain: dto.domain,
      jqlQueries: dto.jqlQueries,
    };
  }

  public static toDto(domain: JiraIntegration): JiraIntegrationDto {
    return {
      id: domain.id,
      configuredById: domain.configuredById,
      domain: domain.domain,
      jqlQueries: domain.jqlQueries,
    };
  }

  public static toIntegrationResponse(domain: JiraIntegration): GetJiraIntegrationResponse {
    return {
      id: domain.id,
      configuredById: domain.configuredById,
      domain: domain.domain,
      jqlQueries: domain.jqlQueries,
    };
  }
}
