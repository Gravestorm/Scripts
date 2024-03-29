"""
Module: imageprefix

This module defines a function to add a prefix to all files in a specified folder.
"""
import os

def add_prefix_to_files(folder_path, prefix):
    """
    Adds a prefix to all files in the specified folder.

    :param folder_path: Path to the folder containing files.
    :param prefix: The prefix to be added to the filenames.
    """
    # List all files in the folder
    files = os.listdir(folder_path)

    for file_name in files:
        # Construct the old and new file paths
        old_path = os.path.join(folder_path, file_name)
        new_name = prefix + file_name
        new_path = os.path.join(folder_path, new_name)

        # Rename the file
        os.rename(old_path, new_path)
        print(f'Renamed: {file_name} to {new_name}')

if __name__ == "__main__":
    # Specify the folder path and prefix
    FOLDER_PATH = 'C:\\IMG\\'
    PREFIX = 'PXL_'

    # Call the function to add the prefix to all files
    add_prefix_to_files(FOLDER_PATH, PREFIX)
