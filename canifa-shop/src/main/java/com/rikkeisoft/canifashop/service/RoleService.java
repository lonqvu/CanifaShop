package com.rikkeisoft.canifashop.service;

import org.springframework.stereotype.Service;

import com.rikkeisoft.canifashop.common.enum_.RoleEnum;
import com.rikkeisoft.canifashop.entity.RoleEntity;
import com.rikkeisoft.canifashop.repository.RoleRepository;

import lombok.RequiredArgsConstructor;

import java.util.List;

public interface RoleService {

	void createRole(RoleEntity roleEntity);
	
	boolean hasRole(RoleEnum name);

	List<String> getNameRole();
}

@Service
@RequiredArgsConstructor
class RoleSeviceImpl implements RoleService {

	private final RoleRepository roleRepository;

	@Override
	public void createRole(RoleEntity roleEntity) {
		roleRepository.save(roleEntity);
	}

	@Override
	public boolean hasRole(RoleEnum name) {
		return roleRepository.existsByName(name);
	}

	@Override
	public List<String> getNameRole() {
		return roleRepository.getAllRole();
	}


}
