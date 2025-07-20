# Explore, Plan, Code, Commit Workflow

This command guides you through a structured workflow for implementing solutions:
1. **Explore** - Read and understand relevant files
2. **Plan** - Create or review an implementation plan
3. **Code** - Implement the solution
4. **Commit** - Commit changes and create a pull request

## Usage
```
/workflow [plan.md]
```

## Phase 1: Explore
First, I'll explore the codebase to understand the context. Please tell me:
- What problem are we solving?
- What files or areas should I focus on?

I will:
- Read relevant files and documentation
- Use subagents to investigate specific questions
- Gather all necessary context WITHOUT writing any code yet

## Phase 2: Plan
{{#if args}}
I'll read the plan from: {{args}}

<Task description="Read plan file">
Read the file {{args}} to understand the implementation plan.
</Task>
{{else}}
I'll create a comprehensive plan for the implementation. I'll think hard about:
- The overall approach
- Key components to modify or create
- Potential challenges and solutions
- Testing strategy

Would you like me to save this plan to a file for future reference?
{{/if}}

## Phase 3: Code
Once the plan is approved, I'll implement the solution:
- Write clean, well-structured code
- Follow existing patterns and conventions
- Verify the solution as I implement each piece
- Ensure all tests pass

## Phase 4: Commit
After implementation is complete, I'll:
- Review all changes
- Create a meaningful commit message
- Generate a pull request with:
  - Clear title and description
  - Summary of changes
  - Test plan
- Update any relevant documentation

---

**Ready to start?** Tell me about the problem you want to solve, and I'll begin the exploration phase.