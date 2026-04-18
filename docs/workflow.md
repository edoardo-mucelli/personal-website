# Project Workflow & Standards

## Branching Strategy
- **`main`**: Production-ready code (Release branch).
- **`dev`**: Main development branch. All feature branches merge here.
- **Feature Branches**: Workflow happens in branches named as follows:
    - `feat/description-of-feature`
    - `fix/description-of-bug`
    - `refactor/description-of-change`
    - `chore/maintenance-tasks`
    - `content/copy-updates`

## Development Workflow
1. **Branching**: Always start from `dev` when creating a new branch.
2. **Context Logging**: Update `docs/dev-log.md` with details of what is being changed/added. This serves as context for automated test generation.
3. **Commits**: Use [Conventional Commits](https://www.conventionalcommits.org/):
    - `feat: ...`
    - `fix: ...`
    - `chore: ...`
    - `docs: ...`
    - `test: ...`
4. **Testing**: Run test suite (if available) before merging into `dev`.
5. **Merging**:
    - Merge feature branch into `dev`.
    - Run final validation.
    - No Pull Requests needed (solo developer).
6. **Release**: Merge `dev` into `main` when stable.

## Testing Standards
- For every new feature in `feat/`, a corresponding test should be considered.
- Use the `docs/dev-log.md` context to guide test requirements.
