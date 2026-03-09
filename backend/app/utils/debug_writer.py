def write_parsed_sections(sections):

    with open("output.txt", "w", encoding="utf-8") as f:

        for section, content in sections.items():

            f.write(f"\n===== {section.upper()} =====\n\n")

            if content.strip():
                f.write(content.strip())
            else:
                f.write("No content detected")

            f.write("\n\n")