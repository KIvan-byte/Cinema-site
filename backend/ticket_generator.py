import io
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A6
from reportlab.lib import colors
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer, Image
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch, cm
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from datetime import datetime
import qrcode
from io import BytesIO

async def generate_ticket_pdf(reservation, showtime, movie, hall, seats):
    # Создаем буфер для PDF
    buffer = io.BytesIO()
    
    # Используем A6 для размера билета (как карточка)
    doc = SimpleDocTemplate(buffer, pagesize=A6, rightMargin=30, leftMargin=30, topMargin=30, bottomMargin=30)
    
    elements = []
    
    # Настройка стилей
    styles = getSampleStyleSheet()
    # Use custom style names that don't conflict with built-in styles
    styles.add(ParagraphStyle(
        name='TicketTitle',
        fontName='Helvetica-Bold',
        fontSize=14,
        alignment=TA_CENTER,
        spaceAfter=12
    ))
    styles.add(ParagraphStyle(
        name='TicketNormal',
        fontName='Helvetica',
        fontSize=10,
        alignment=TA_CENTER,
        spaceAfter=6
    ))
    styles.add(ParagraphStyle(
        name='TicketMovieTitle',
        fontName='Helvetica-Bold',
        fontSize=12,
        alignment=TA_CENTER,
        spaceAfter=8
    ))
    
    # Заголовок билета
    elements.append(Paragraph("CINEMA TICKET", styles['TicketTitle']))
    
    # Информация о фильме
    elements.append(Paragraph(movie['title'], styles['TicketMovieTitle']))
    
    # Информация о сеансе
    # Handle different datetime string formats
    if isinstance(showtime['start_time'], str):
        if "Z" in showtime['start_time']:
            show_date = datetime.strptime(showtime['start_time'].split(".")[0], "%Y-%m-%dT%H:%M:%S")
        else:
            show_date = datetime.strptime(showtime['start_time'], "%Y-%m-%dT%H:%M:%S")
    else:
        show_date = showtime['start_time']  # Already a datetime object
        
    date_str = show_date.strftime("%d %B %Y")
    time_str = show_date.strftime("%H:%M")
    
    elements.append(Paragraph(f"Date: {date_str}", styles['TicketNormal']))
    elements.append(Paragraph(f"Time: {time_str}", styles['TicketNormal']))
    elements.append(Paragraph(f"Hall: {hall['name']}", styles['TicketNormal']))
    
    # Информация о местах
    seat_info = ", ".join([f"Row {seat['row']} / Seat {seat['number']}" for seat in seats])
    elements.append(Paragraph(f"Seats: {seat_info}", styles['TicketNormal']))
    
    # Генерируем QR код с информацией о билете
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=2,
        border=1,
    )
    qr_data = f"ID:{reservation['id']}\nMovie:{movie['title']}\nDate:{date_str}\nTime:{time_str}\nHall:{hall['name']}\nSeats:{seat_info}"
    qr.add_data(qr_data)
    qr.make(fit=True)
    
    img = qr.make_image(fill_color="black", back_color="white")
    
    # Сохраняем QR код во временный файл
    qr_buffer = BytesIO()
    img.save(qr_buffer)
    qr_buffer.seek(0)
    
    # Add the QR code image to the PDF
    elements.append(Spacer(1, 0.2 * inch))
    qr_img = Image(qr_buffer, 1.5*inch, 1.5*inch)
    qr_img.hAlign = 'CENTER'
    elements.append(qr_img)
    
    # Сгенерировать документ
    doc.build(elements)
    
    # Получаем содержимое буфера
    buffer.seek(0)
    return buffer

