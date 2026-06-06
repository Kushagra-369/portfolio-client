# utils/response_builder.py

import json
import os
from typing import List, Dict, Any

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, "data")

with open(os.path.join(DATA_DIR, "portfolio.json"), "r") as file:
    portfolio = json.load(file)


def format_skills() -> str:
    """Return category-wise formatted skills"""
    s = portfolio["skills"]
    
    # Detect if running in terminal or web
    import sys
    is_terminal = not hasattr(sys, 'ps1') or 'IPython' not in sys.modules
    
    if is_terminal:
        # Terminal output with emojis
        return (
            "\n" + "="*50 + "\n"
            "🎨 KUSHAGRA'S SKILLS\n"
            "="*50 + "\n\n"
            f"🎨 Frontend     : {', '.join(s['frontend'])}\n"
            f"⚙️ Backend      : {', '.join(s['backend'])}\n"
            f"🗄️ Database     : {', '.join(s['database'])}\n"
            f"☁️ DevOps       : {', '.join(s['devops'])}\n"
            f"📝 Languages    : {', '.join(s['languages'])}\n"
            "\n" + "="*50
        )
    else:
        # Web output with line breaks
        return (
            "🎨 **Kushagra's Skills**\n\n"
            f"• **Frontend**: {', '.join(s['frontend'])}\n"
            f"• **Backend**: {', '.join(s['backend'])}\n"
            f"• **Database**: {', '.join(s['database'])}\n"
            f"• **DevOps**: {', '.join(s['devops'])}\n"
            f"• **Languages**: {', '.join(s['languages'])}"
        )


def format_projects(is_detailed: bool = False) -> str:
    """Return formatted projects with links"""
    projects = portfolio["projects"]
    
    import sys
    is_terminal = not hasattr(sys, 'ps1') or 'IPython' not in sys.modules
    
    if is_detailed:
        result += "📁 KUSHAGRA'S PROJECTS (DETAILED)\n"
        
        for i, project in enumerate(projects, 1):
            result += f"{i}. 🚀 {project['name']} [{project['category']}]\n"
            result += f"   📝 {project['description'][:150]}...\n"
            result += f"   🛠️  {', '.join(project['tools'][:4])}"
            if len(project['tools']) > 4:
                result += f" +{len(project['tools'])-4} more"
            result += "\n"
            
            if is_terminal:
                result += f"   🔗 GitHub: {project['github']}\n"
                result += f"   🌐 Live   : {project['live']}\n"
            else:
                # For web - clickable links
                result += f"   🔗 GitHub: <a href='{project['github']}' target='_blank'>{project['github']}</a>\n"
                result += f"   🌐 Live: <a href='{project['live']}' target='_blank'>{project['live']}</a>\n"
            result += "\n"
        
        return result
    
    else:
        # Simple project list
        result = "\n📁 **Kushagra's Projects**\n\n"
        for i, project in enumerate(projects, 1):
            result += f"{i}. **{project['name']}** - {project['category']}\n"
        
        result += f"\n👉 Total: {len(projects)} projects\n"
        result += "💡 Ask 'tell me about [project name]' for details"
        return result


def format_achievements() -> str:
    """Return formatted achievements"""
    achievements = portfolio["achievements"]
    
    result = "\n" + "="*50 + "\n"
    result += "🏆 ACHIEVEMENTS\n"
    result += "="*50 + "\n\n"
    
    for ach in achievements:
        result += f"✓ {ach}\n"
    
    result += "\n" + "="*50
    return result


def format_education() -> str:
    """Return formatted education"""
    edu = portfolio["education"]
    return (
        f"\n🎓 **Education**\n"
        f"• Degree: {edu['degree']}\n"
        f"• CGPA: {edu['cgpa']}\n"
        f"• Status: {portfolio['identity']['status']}"
    )


def format_contact() -> str:
    """Return formatted contact with links"""
    contact = portfolio["contact"]
    profiles = portfolio["profiles"]
    
    import sys
    is_terminal = not hasattr(sys, 'ps1') or 'IPython' not in sys.modules
    
    if is_terminal:
        return (
            f"\n📧 Email: {contact['email']}\n"
            f"🐙 GitHub: https://github.com/{profiles['github']}\n"
            f"🔗 LinkedIn: https://linkedin.com/in/{profiles['linkedin']}\n"
            f"💻 LeetCode: https://leetcode.com/{profiles['leetcode']}"
        )
    else:
        return (
            f"📧 **Email**: {contact['email']}\n\n"
            f"🐙 **GitHub**: <a href='https://github.com/{profiles['github']}' target='_blank'>{profiles['github']}</a>\n"
            f"🔗 **LinkedIn**: <a href='https://linkedin.com/in/{profiles['linkedin']}' target='_blank'>{profiles['linkedin']}</a>\n"
            f"💻 **LeetCode**: <a href='https://leetcode.com/{profiles['leetcode']}' target='_blank'>{profiles['leetcode']}</a>"
        )


def format_about_me() -> str:
    """Return formatted about section"""
    about = portfolio["about"]
    
    return (
        f"\n📌 **About Kushagra Chhabra**\n\n"
        f"{about['summary']}\n\n"
        f"🎯 **Interests**: {', '.join(about['interests'])}\n"
        f"💼 **Status**: {portfolio['identity']['status']}\n"
        f"🌍 **Location**: {portfolio['identity']['country']}"
    )


def get_project_details(project_name: str) -> str:
    """Return detailed info for a specific project"""
    project_name = project_name.lower()
    
    for project in portfolio["projects"]:
        if project["name"].lower() in project_name:
            import sys
            is_terminal = not hasattr(sys, 'ps1') or 'IPython' not in sys.modules
            
            result += f"🚀 {project['name']}\n"
            result += f"📂 Category: {project['category']}\n"
            result += f"📝 Description: {project['description']}\n"
            result += f"🛠️ Technologies: {', '.join(project['tools'])}\n\n"
            
            if is_terminal:
                result += f"🔗 GitHub: {project['github']}\n"
                result += f"🌐 Live Demo: {project['live']}\n"
            else:
                result += f"🔗 GitHub: <a href='{project['github']}' target='_blank'>{project['github']}</a>\n"
                result += f"🌐 Live Demo: <a href='{project['live']}' target='_blank'>{project['live']}</a>\n"
            
            return result
    
    return None


# Dictionary to map intents to formatters
INTENT_FORMATTERS = {
    "skills": format_skills,
    "achievements": format_achievements,
    "education": format_education,
    "contact": format_contact,
    "about_me": format_about_me,
}