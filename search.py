import os

search_terms = ["takeuforward", "sde sheet"]
results = []

# Check index.html
if os.path.exists("index.html"):
    with open("index.html", "r", encoding="utf-8") as f:
        content = f.read().lower()
        for term in search_terms:
            if term in content:
                results.append(f"Match '{term}' in index.html")

# Check src folder
for root, dirs, files in os.walk("src"):
    for file in files:
        if file.endswith((".js", ".jsx", ".css")):
            filepath = os.path.join(root, file)
            try:
                with open(filepath, "r", encoding="utf-8") as f:
                    content = f.read().lower()
                    for term in search_terms:
                        if term in content:
                            results.append(f"Match '{term}' in {filepath}")
            except Exception as e:
                results.append(f"Error reading {filepath}: {str(e)}")

with open("search_results.txt", "w", encoding="utf-8") as f:
    f.write("\n".join(results))
print("Search complete. Results written to search_results.txt.")
