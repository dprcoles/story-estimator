import { Mapper } from "src/application/common/mapper";
import { JiraIssue } from "src/domain/models/jira-issue.model";
import { JiraIssueDto } from "../dtos/jira-issue.dto";
import { GetJiraIssuesResponse } from "../responses/jira-issues.response";

export class JiraIssueMap extends Mapper<JiraIssue> {
  public static toDomain(dto: JiraIssueDto): JiraIssue {
    return {
      key: dto.key,
      type: dto.type,
      priority: dto.priority,
      status: dto.status,
      summary: dto.summary,
    };
  }

  public static toDto(domain: JiraIssue): JiraIssueDto {
    return {
      key: domain.key,
      type: domain.type,
      priority: domain.priority,
      status: domain.status,
      summary: domain.summary,
    };
  }

  public static toIssuesResponse(domain: JiraIssue[]): GetJiraIssuesResponse {
    return {
      issues: domain.map((x) => ({
        key: x.key,
        type: x.type,
        priority: x.priority,
        status: x.status,
        summary: x.summary,
      })),
    };
  }
}
