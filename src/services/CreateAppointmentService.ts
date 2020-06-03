import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/appointment';
import AppointmentsRepository from '../repository/AppointmentsRepository';

interface RequestDTO {
	date: Date;
	provider_id: string;
}

class CreateAppointmentService {
	public async execute({
		date,
		provider_id,
	}: RequestDTO): Promise<Appointment> {
		const appointmentsRepository = getCustomRepository(AppointmentsRepository);
		const appointmentDate = startOfHour(date); // bussiness rules

		const findAppointmentInSameDate = await appointmentsRepository.findByDate(
			appointmentDate,
		);

		if (findAppointmentInSameDate) {
			throw Error('This Appointment is already booked.');
		}

		const appointment = appointmentsRepository.create({
			provider_id,
			date: appointmentDate,
		});

		await appointmentsRepository.save(appointment);

		return appointment;
	}
}

export default CreateAppointmentService;
