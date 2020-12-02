import * as ts from "typescript";
import * as Lint from "tslint";

import { RuleSeverity } from "tslint";

export interface CodeInsightAnnotation {
	externalId?: string;
	line?: number;
	link?: string;
	message: string;
	path?: string;
	severity: "LOW" | "MEDIUM" | "HIGH";
	type?: "VULNERABILITY" | "CODE_SMELL" | "BUG";
}

export class Formatter extends Lint.Formatters.AbstractFormatter {
	private readonly severityMap: Record<RuleSeverity, CodeInsightAnnotation['severity']> = {
		warning: 'MEDIUM',
		error: 'HIGH',
		off: 'LOW'
	}

	public format(failures: Lint.RuleFailure[]): string {
		const annotations: CodeInsightAnnotation[] = failures.map((failure: Lint.RuleFailure) => this.failureToAnnoatation(failure));

		return JSON.stringify({annotations});
	}

	private failureToAnnoatation(failure: Lint.RuleFailure): CodeInsightAnnotation {
		return {
			line: failure.getStartPosition().getLineAndCharacter().line,
			severity: this.severityMap[failure.getRuleSeverity()],
			message: failure.getFailure(),
			path: failure.getFileName(),
			externalId: failure.getRuleName()
		}
	}
}