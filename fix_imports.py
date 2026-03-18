import os
import re

# Mapping of file names/paths to their new locations relative to src/
FILE_MAP = {
    'SEO': 'shared/components/SEO',
    'portfolioData': 'shared/constants/portfolioData',
    'portfolioData.js': 'shared/constants/portfolioData.js',
    'PortfolioContext': 'shared/context/PortfolioContext',
    'globalStyles': 'shared/styles/globalStyles',
    'Notifications': 'features/core/components/Notifications',
    'ModeCard': 'features/core/components/ModeCard',
    'terminalCommands': 'features/ide/utils/terminalCommands',
    'terminalCommands.js': 'features/ide/utils/terminalCommands.js',
    'highlightSyntax': 'features/ide/utils/highlightSyntax',
    'MobileBlocker': 'features/ide/components/MobileBlocker',
    'MenuBar': 'features/ide/components/MenuBar',
    'Toolbar': 'features/ide/components/Toolbar',
    'Sidebar': 'features/ide/components/Sidebar',
    'Editor': 'features/ide/components/Editor',
    'Terminal': 'features/ide/components/Terminal',
    'StatusBar': 'features/ide/components/StatusBar',
    'ModeSelectionPage': 'features/core/pages/ModeSelectionPage',
    'WebModePage': 'features/web/pages/WebModePage',
    'IDEModePage': 'features/ide/pages/IDEModePage',
    'WebLoadingScreen': 'features/web/components/WebLoadingScreen',
    'WebCursor': 'features/web/components/WebCursor',
    'WebNavbar': 'features/web/components/WebNavbar',
    'WebSideNav': 'features/web/components/WebSideNav',
    'WebGlobalStyles': 'features/web/components/WebGlobalStyles',
    'HeroSection': 'features/web/components/sections/HeroSection',
    'MarqueeSection': 'features/web/components/sections/MarqueeSection',
    'AboutSection': 'features/web/components/sections/AboutSection',
    'SkillsSection': 'features/web/components/sections/SkillsSection',
    'ProjectsSection': 'features/web/components/sections/ProjectsSection',
    'ExperienceSection': 'features/web/components/sections/ExperienceSection',
    'ContactSection': 'features/web/components/sections/ContactSection',
}

def get_rel_path(from_file, to_file):
    from_dir = os.path.dirname(from_file)
    rel_path = os.path.relpath(to_file, from_dir)
    if not rel_path.startswith('.'):
        rel_path = './' + rel_path
    return rel_path

for root, _, files in os.walk('src'):
    for file in files:
        if file.endswith('.jsx') or file.endswith('.js'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r') as f:
                content = f.read()

            new_content = content

            # Find all import statements
            import_pattern = r'import\s+(?:.*?)\s+from\s+[\'"](.*?)[\'"]'
            dynamic_import_pattern = r'import\([\'"](.*?)[\'"]\)'

            def replace_match(match):
                original_import = match.group(1)

                # If it's an external library or asset, keep it
                if not original_import.startswith('.'):
                    return match.group(0)

                # Get the absolute path of the imported file (without extension)
                # Then map it to new path

                # Get just the filename
                filename = os.path.basename(original_import)
                if filename in FILE_MAP:
                    new_target = 'src/' + FILE_MAP[filename]
                    rel_path = get_rel_path(filepath, new_target)
                    return match.group(0).replace(original_import, rel_path)

                # Check if it maps to any known folder
                return match.group(0)

            new_content = re.sub(import_pattern, replace_match, new_content)
            new_content = re.sub(dynamic_import_pattern, replace_match, new_content)

            # Additional replace for WebModePage imports like `../components/web/WebCursor`
            # which might not be caught accurately if basename doesn't match perfectly

            if content != new_content:
                with open(filepath, 'w') as f:
                    f.write(new_content)

print("Imports updated.")
