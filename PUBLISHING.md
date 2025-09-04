# Publishing Guide

This document explains how the automatic npm publishing works for the Angular DateTime Picker library.

## 🚀 Automatic Publishing

Our CI/CD pipeline automatically publishes packages to npm based on different triggers:

### Development Builds
- **Trigger**: Every commit to any branch
- **Version Format**: `0.0.0-{branchName}.{commitHash}`
- **NPM Tag**: Branch name
- **Example**: `0.0.0-feature-agenda.a1b2c3d`

### Stable Releases
- **Trigger**: Git tags (e.g., `1.0.0`, `2.1.3`)
- **Version Format**: Tag version
- **NPM Tag**: `latest`
- **Example**: `1.0.0`

## 📦 Package Information

- **NPM Organization**: `@softint`
- **Package Name**: `@softint/angular-datetime-picker`
- **Registry**: [npmjs.com](https://www.npmjs.com/package/@softint/angular-datetime-picker)

## 🔧 Setup Instructions

### 1. NPM Token Configuration

#### Create NPM Token
1. Go to [npmjs.com](https://www.npmjs.com) and log in
2. Click your profile → **Access Tokens**
3. Click **Generate New Token**
4. Choose **Automation** token type
5. Copy the token (starts with `npm_`)

#### Add Token to Azure DevOps
1. Go to your Azure DevOps project
2. Navigate to **Pipelines** → **Library**
3. Click **+ Variable group** or **+ Variable**
4. Name: `NPM_TOKEN`
5. Value: Paste your npm token
6. ✅ Check **Keep this value secret**
7. Save

#### Link Variable to Pipeline
1. Go to your pipeline
2. Click **Edit** → **Variables**
3. Add variable: `NPM_TOKEN`
4. ✅ Check **Keep this value secret**
5. Save

## 🎯 Usage Examples

### Development Testing

```bash
# 1. Push to any branch
git push origin feature/new-feature

# 2. Pipeline automatically publishes:
# @softint/angular-datetime-picker@0.0.0-feature-new-feature.abc1234

# 3. Other developers can test:
npm install @softint/angular-datetime-picker@0.0.0-feature-new-feature.abc1234
```

### Stable Release

```bash
# 1. Create and push tag
git tag 1.0.0
git push origin 1.0.0

# 2. Pipeline automatically publishes:
# @softint/angular-datetime-picker@1.0.0 (with 'latest' tag)

# 3. Users can install:
npm install @softint/angular-datetime-picker
```

## 📋 Versioning Strategy

### Development Versions
- Format: `0.0.0-{branchName}.{commitHash}`
- Purpose: Testing and development
- NPM Tag: Branch name
- Examples:
  - `0.0.0-main.abc1234`
  - `0.0.0-feature-agenda.def5678`
  - `0.0.0-bugfix-calendar.ghi9012`

### Stable Versions
- Format: Semantic versioning (e.g., `1.0.0`, `2.1.3`)
- Purpose: Production releases
- NPM Tag: `latest`
- Examples:
  - `1.0.0` (Major release)
  - `1.1.0` (Minor release)
  - `1.1.1` (Patch release)

## 🔍 Finding Published Packages

### View All Versions
```bash
npm view @softint/angular-datetime-picker versions --json
```

### View Latest Version
```bash
npm view @softint/angular-datetime-picker version
```

### View Package Info
```bash
npm info @softint/angular-datetime-picker
```

## 🚨 Troubleshooting

### Pipeline Not Publishing
1. Check if NPM_TOKEN is set correctly in Azure DevOps
2. Verify the token has automation permissions
3. Check pipeline logs for authentication errors

### Version Conflicts
- Development versions use `0.0.0-` prefix to avoid conflicts
- Each commit gets a unique version based on branch and commit hash

### Access Issues
- Ensure your npm account has access to the `@softint` organization
- Verify the token has the correct permissions
