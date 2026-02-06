import xml.etree.ElementTree as ET

def update_testname_in_xml(xml_file_path, output_file_path):
    tree = ET.parse(xml_file_path)
    root = tree.getroot()

    # Find all elements with class="HTTPSamplerProxy"
    http_sampler_proxies = root.findall(".//element[@class='HTTPSamplerProxy']")

    # Initialize a counter for sequential numbering
    counter = 1

    for element in http_sampler_proxies:
        # Extract the current testname value
        testname = element.get('testname')

        # Split the testname string to modify only the numeric part
        parts = testname.split('/')
        if len(parts) > 2:
            # Extract the numeric part and update it
            numeric_part = parts[0]
            new_numeric_part = str(counter).zfill(2)  # Ensure two digits
            parts[0] = new_numeric_part
            new_testname = '/'.join(parts)
            
            # Update the testname attribute in the XML element
            element.set('testname', new_testname)
        
        # Increment the counter for the next sequential number
        counter += 1

    # Write the updated XML to a new file
    tree.write(output_file_path)

# Example usage
if __name__ == '__main__':
    xml_file_path = 'data/UC07_Служебная_записка_web.jmx'
    output_file_path = 'data/UC07_Служеная_записка_web_updated.jmx'
    update_testname_in_xml(xml_file_path, output_file_path)
