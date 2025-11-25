import re

# Read the file
with open('App.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Find and replace the handleBack function
old_function = r'''  const handleBack = \(\) => \{
    if \(view === AppView\.NUTRITION_PRO \|\| view === AppView\.NEWS \|\| view === AppView\.PATIENTS_LIST\) \{
        setView\(AppView\.DASHBOARD\);
    \} else if \(view === AppView\.CATEGORY_VIEW\) \{
      setView\(AppView\.DASHBOARD\);
      setSelectedSpecialtyId\(null\);
    \} else if \(view !== AppView\.DASHBOARD\) \{
        if \(selectedSpecialtyId && Object\.values\(AppView\)\.includes\(view as AppView\)\) \{
            setView\(AppView\.CATEGORY_VIEW\);
        \} else \{
            setView\(AppView\.DASHBOARD\);
            setSelectedSpecialtyId\(null\);
        \}
    \}
  \};'''

new_function = '''  const handleBack = () => {
    // Handle special views that always go back to dashboard
    if (view === AppView.NUTRITION_PRO || view === AppView.NEWS || view === AppView.PATIENTS_LIST) {
        setView(AppView.DASHBOARD);
        setSelectedSpecialtyId(null);
        return;
    }
    
    // Handle legal views - go back to dashboard
    if (view === LegalView.PRIVACY || view === LegalView.TERMS || view === LegalView.ABOUT) {
        setView(AppView.DASHBOARD);
        setSelectedSpecialtyId(null);
        return;
    }
    
    // From category view, go back to dashboard
    if (view === AppView.CATEGORY_VIEW) {
      setView(AppView.DASHBOARD);
      setSelectedSpecialtyId(null);
      return;
    }
    
    // From a calculator view
    if (view !== AppView.DASHBOARD && view !== AppView.PRO_LOGIN) {
        // If we have a selected specialty, go back to that category
        if (selectedSpecialtyId && Object.values(AppView).includes(view as AppView)) {
            setView(AppView.CATEGORY_VIEW);
        } else {
            // Otherwise go to dashboard
            setView(AppView.DASHBOARD);
            setSelectedSpecialtyId(null);
        }
    }
  };'''

# Replace
content = re.sub(old_function, new_function, content)

# Write back
with open('App.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Navigation fix applied successfully!")
