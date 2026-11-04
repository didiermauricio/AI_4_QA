from pathlib import Path
from pypdf import PdfReader

pdf_path = Path(r'c:\DEV\AI_4_QA\AI_4_QA\app_req\App_Requirements.pdf')
out_path = Path(r'c:\DEV\AI_4_QA\AI_4_QA\app_req\App_Requirements.txt')

if not pdf_path.exists():
    raise FileNotFoundError(f'Missing PDF: {pdf_path}')

reader = PdfReader(str(pdf_path))
text = '\n'.join(page.extract_text() or '' for page in reader.pages)
out_path.write_text(text, encoding='utf-8')
print(f'PDF pages: {len(reader.pages)}')
print(f'Extracted to: {out_path}')
print('---START---')
print(text[:8000])
print('---END---')
