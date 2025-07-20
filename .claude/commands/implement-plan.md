# Implement Plan from File

This command implements a solution based on a provided plan file using the explore-plan-code-commit workflow.

## Usage
```
/implement-plan <plan-file.md>
```

## Workflow Execution

{{#if args}}
### Reading Plan: {{args}}

<Task description="Read and analyze plan">
Read the plan file at {{args}} and extract:
- The problem to solve
- Implementation steps
- Files to modify or create
- Testing requirements
</Task>

### Phase 1: Explore
Based on the plan, I'll now explore the relevant parts of the codebase:

<Task description="Explore codebase for plan context">
1. Read all files mentioned in the plan
2. Search for related functionality
3. Understand existing patterns and conventions
4. Identify any dependencies or potential conflicts
5. Use subagents to investigate specific technical questions
</Task>

### Phase 2: Review Plan
I'll review the plan with the context I've gathered and identify:
- Any adjustments needed based on codebase exploration
- Additional implementation details
- Potential risks or challenges

*I'll think hard about the best approach before proceeding.*

### Phase 3: Code Implementation
I'll implement the solution according to the plan:
- Follow the implementation steps sequentially
- Verify each component as it's built
- Run relevant tests after each major change
- Ensure code follows project conventions

### Phase 4: Commit and PR
Once implementation is complete:
- Review all changes for correctness
- Run full test suite
- Create a detailed commit message
- Generate pull request with comprehensive description

{{else}}
**Error**: Please provide a plan file path as an argument.

Example:
```
/implement-plan expense-splitter-prompt.md
```
{{/if}}

---

**Note**: This command assumes the plan file contains clear implementation steps. For best results, the plan should include:
- Problem description
- Specific files to modify
- Step-by-step implementation guide
- Testing requirements